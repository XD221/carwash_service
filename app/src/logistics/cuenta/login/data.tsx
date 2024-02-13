import { useState } from "react";

export const useData = ()=>{
    const [user, setUser] = useState(null);
	const [access, setAccess] = useState(null);

    return {
        user,
        setUser,
        access,
        setAccess
    }
}