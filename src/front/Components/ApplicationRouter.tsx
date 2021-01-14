import React from "react"
import { Route, HashRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Home } from "./Home";
import { BoardRouter } from "../Boards/Board";
const routerHistory = createBrowserHistory();

export function ApplicationRouter() {
    return <div style={{ margin: 8 }}><HashRouter history={routerHistory}>
        <Switch>
            <Route path="/boards/:id" component={BoardRouter} />
            <Route path="/" component={Home} />
        </Switch>
    </HashRouter></div>
}