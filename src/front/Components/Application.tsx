import React from "react";
import { RecoilRoot } from "recoil";
import { ApplicationRouter } from "./ApplicationRouter";

export function Application() {
    return <RecoilRoot>
        <ApplicationRouter />
    </RecoilRoot>
}
