import { observable, action, computed } from "mobx";

interface State {
    grid: Array<Array<number | undefined>>;
    solved: boolean;
}
export class Store {
    @observable private state: State

    public constructor() {
        this.reset();
    }

    @action
    public reset = () => {
        this.state = {
            grid: [],
            solved: false
        }

        for (let r = 0; r < 9; r++) {
            const row = []
            for (let c = 0; c < 9; c++) {
                row.push(undefined)
            }
            this.state.grid.push(row);
        }
    }

    @computed
    public get solved() {
        return this.state.solved;
    }
    @action
    public updateGrid = (r: number, c: number, val: number) => {
        val = val % 10

        if (isNaN(val) || val === 0) {
            this.state.grid[r - 1][c - 1] = undefined;
            return;
        }

        this.state.grid[r - 1][c - 1] = val
    }

    public gridVal = (r: number, c: number) => {
        return this.state.grid[r - 1][c - 1]
    }

    @action
    public solve = () => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.state.grid[r][c] = 1;
            }
        }
        this.state.solved = true;
        return;
    }
}