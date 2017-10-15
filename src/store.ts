import { observable, action, computed, ObservableMap } from "mobx";

interface State {
    grid: ObservableMap<number | undefined>;
    potentialSolutions: { [key: string]: string };
    solved: boolean;
}
export class Store {
    @observable private state: State;
    private digits = "123456789";
    private rows = "ABCDEFGHI";
    private columns = this.digits;
    private squares: string[] = []
    private unitlist: string[][] = []
    private units: { [key: string]: string[][] } = {}
    private peers: { [key: string]: string[] } = {}
    private solutionPromise: Promise<void> | undefined = undefined;

    public constructor() {
        this.squares = this.cross(this.rows, this.columns);
        for (let i = 0; i < 9; i++) {
            this.unitlist.push(this.cross(this.rows.charAt(i), this.columns))
        }

        for (let i = 0; i < 9; i++) {
            this.unitlist.push(this.cross(this.rows, this.columns.charAt(i)))
        }

        const boxRows = ["ABC", "DEF", "GHI"]
        const boxCols = ["123", "456", "789"]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.unitlist.push(this.cross(boxRows[i], boxCols[j]))
            }
        }

        this.squares.forEach(s => {
            this.units[s] = [];
            this.unitlist.forEach(units => {
                units.some(u => {
                    if (u === s) {
                        this.units[s].push(units)
                        return true
                    }

                    return false
                })
            })
        });

        this.squares.forEach(s => {
            this.peers[s] = []

            const visited: { [key: string]: boolean } = {}
            this.units[s].forEach(units => {
                units.forEach(u => {
                    if (visited[u] || u === s) {
                        return
                    }
                    this.peers[s].push(u)
                    visited[u] = true
                })
            })
        });

        this.reset();
    }

    @action
    public reset = () => {
        this.state = {
            grid: new ObservableMap(),
            solved: false,
            potentialSolutions: {}
        }
    }

    @computed
    public get solved() {
        return this.state.solved;
    }
    @action
    public updateGrid = (cell: string, val: number) => {
        if (!this.peers[cell]) {
            alert("Invalid Cell")
            this.parsePossibleSolutions()
            return
        }

        val = val % 10
        if (isNaN(val) || val === 0) {
            this.state.grid.delete(cell)
            this.parsePossibleSolutions()
            return;
        }

        const invalid = this.peers[cell].some(p => {
            if (this.state.grid.get(p) === val) {
                return true
            }
            return false
        })

        if (invalid) {
            alert("Invalid Sudoku")
            this.parsePossibleSolutions()
            return
        }

        this.state.grid.set(cell, val)

        const calcSolutions = async () => {
            if (this.solutionPromise) {
                await this.solutionPromise;
            }
            this.solutionPromise = this.parsePossibleSolutions()
        }

        calcSolutions()
    }

    @action
    private parsePossibleSolutions = async () => {
        this.squares.forEach(s => {
            this.state.potentialSolutions[s] = this.digits
        })

        const valid = this.state.grid.keys().every(key => {
            if (!this.assign(this.state.potentialSolutions, key, this.state.grid.get(key))) {
                return false
            }

            return true
        })
        if (!valid) {
            alert("Contradiction detected")
            return
        }
    }

    @action
    private search = (values: { [key: string]: string } | false) => {
        if (!values) {
            return false;
        }

        if (this.isSolved(values)) {
            return values
        }

        let min = 11
        let square: string;
        this.squares.forEach(s => {
            if (values[s].length > 1 && values[s].length < min) {
                square = s
                min = values[s].length
            }
        })

        const valid = values[square].split("").some(v => {
            if (!values) {
                return false
            }
            const val = this.search(this.assign(Object.assign({}, values), square, parseInt(v)))
            if (!val) {
                return false
            }

            values = val;
            return true
        })
        if (!valid) {
            return false
        }

        return values;
    }

    private isSolved = (values: { [key: string]: string }) => {
        return this.squares.every(s => values[s].length === 1)
    }

    @action
    private assign = (values: { [key: string]: string }, key: string, val: number) => {
        const otherVals = values[key].replace(val.toString(), "");
        if (!otherVals.split("").every(v => this.eliminate(values, key, v))) {
            return false
        }

        return values
    }

    @action
    private eliminate = (values: { [key: string]: string }, key: string, val: string) => {
        if (values[key].indexOf(val) === -1) {
            return true
        }

        values[key] = values[key].replace(val, "")

        if (values[key].length === 0) {
            return false
        } else if (values[key].length === 1) {
            if (!this.peers[key].every(p => this.eliminate(values, p, values[key]))) {
                return false
            }
        }

        return this.units[key].every(unit => {
            const ss = unit.filter(s => values[s].indexOf(val) !== -1)
            if (ss.length === 0) {
                return false
            } else if (ss.length === 1) {
                if (!this.assign(values, ss[0], parseInt(val))) {
                    return false
                }
            }

            return true
        })
    }

    public gridVal = (cell: string) => {
        return this.state.grid.get(cell)
    }

    public cell = (r, c: number) => {
        return this.rows.charAt(r - 1) + this.columns.charAt(c - 1)
    }

    @action
    public solve = async () => {
        if (this.solutionPromise) {
            await this.solutionPromise;
        }

        const val = this.search(this.state.potentialSolutions);
        if (!val) {
            alert("No solution found")
        } else {
            this.state.potentialSolutions = val;
        }

        this.squares.forEach(s => {
            this.state.grid.set(s, parseInt(this.state.potentialSolutions[s]))
        })

        this.state.solved = true;
        return;
    }

    private cross(A: string, B: string) {
        const cross = []
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B.length; j++) {
                cross.push(A.charAt(i) + B.charAt(j))
            }
        }

        return cross;
    }
}