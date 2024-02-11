import { useState } from "react";
import { TProviderParams } from "src/types/default";

export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [access, setAccess] = useState(null);
};
