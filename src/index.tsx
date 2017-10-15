import * as React from "react";
import { render } from "react-dom";
import { Store } from "./store";
import { observer, inject } from "mobx-react";
import { forceRenderStyles, cssRule, style, classes } from "typestyle";
import { rem } from "csx";

interface GridProps {
    store?: Store
}

@inject(() => ({
    store: new Store()
}))
@observer
class Grid extends React.Component<GridProps> {
    private Styles = {
        form: style({
            display: "inline-block",
            padding: rem(1),
            backgroundColor: "#fca6a6"
        }),
        btn: style({
            backgroundColor: "#b4cef7",
            border: "none",
            color: "white",
            padding: `${rem(1)} ${rem(2)}`,
            textAlign: "center",
            display: "inline-block",
            cursor: "pointer",
            fontSize: rem(1),
            marginTop: rem(2),
            borderRadius: rem(0.3)
        }),
        submitBtn: style({
            float: "right"
        }),
        resetBtn: style({
            float: "left"
        }),
        table: style({
            borderCollapse: "collapse",
            height: rem(20),
            width: rem(20)
        }),
        section: style({
            border: "solid medium"
        })
    }

    public render() {
        if (!this.props.store) {
            return null;
        }
        const boxes = []
        let rows = [];
        for (let r = 1; r <= 9; r++) {
            rows.push(<Row store={this.props.store} key={r} r={r} />);

            if (r % 3 === 0) {
                boxes.push(
                    <tbody className={this.Styles.section} key={r / 3}>
                        {rows}
                    </tbody>
                );
                rows = [];
            }
        }

        return <form className={this.Styles.form} onSubmit={this.solve}>
            <h2>Sudoku Solver</h2>
            <h3>
                (<a href="http://norvig.com/sudoku.html">http://norvig.com/sudoku.html</a>)
            </h3>
            <table className={this.Styles.table}>
                {boxes}
            </table>
            <button onClick={this.props.store.reset} className={classes(this.Styles.btn, this.Styles.resetBtn)} type="reset">Reset</button>
            <button className={classes(this.Styles.btn, this.Styles.submitBtn)} disabled={this.props.store.solved} type="submit">Solve</button>
        </form>;
    }

    private solve = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!this.props.store) {
            return;
        }
        this.props.store.solve();
    }
}

interface RowProps {
    r: number,
    store: Store
}

@observer
class Row extends React.Component<RowProps> {
    private Styles = {
        cell: style({
            border: "solid thin",
            height: rem(3),
            width: rem(3),
            textAlign: "center",
            $nest: {
                "input": {
                    width: rem(3),
                    height: rem(3),
                    border: 0,
                    textAlign: "center",
                    fontSize: rem(2)
                }
            }
        }),
        row: style({
            $nest: {
                "td:nth-child(3n)": {
                    borderRight: "solid medium"
                }
            }
        })
    }

    public render() {
        const cells = []
        for (let c = 1; c <= 9; c++) {
            cells.push(
                <td className={this.Styles.cell} key={c}>
                    {this.input(c)}
                </td>
            )
        }

        return <tr className={this.Styles.row}>
            {cells}
        </tr>;
    }

    private input(c: number) {
        const { r, store } = this.props;

        const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
            store.updateGrid(store.cell(r, c), parseInt(ev.currentTarget.value, 10));
        }

        const val = store.gridVal(store.cell(r, c))
        return <input type="text" disabled={store.solved} onChange={onChange} value={val === undefined ? "" : val} />
    }
}

cssRule("body", {
    fontFamily: "Open Sans, sans-serif"
})
forceRenderStyles()
render(<Grid />, document.getElementById("root"));