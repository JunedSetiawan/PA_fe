'use client'

import React, { Dispatch, SetStateAction } from "react";


interface typeContextProps {
    UserAuthed: typeUserAuthed;
    setUserAuthed: Dispatch<SetStateAction<typeUserAuthed>>;
    StatusCode: number;
    setStatusCode: Dispatch<SetStateAction<number>>;
    BreadcumbNav: typeBreadcumbProps;
    setBreadcumbNav: Dispatch<SetStateAction<typeBreadcumbProps>>;
    Transporter: any;
    setTransporter: Dispatch<SetStateAction<any>>;
}

export const AppContext = React.createContext<typeContextProps>({
    UserAuthed: {},
    setUserAuthed: () => { },
    StatusCode: 202,
    setStatusCode: () => { },
    BreadcumbNav: [],
    setBreadcumbNav: () => { },
    Transporter: [],
    setTransporter: () => { }
});