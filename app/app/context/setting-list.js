import React, { useReducer, useContext } from 'react';

const Settings = React.createContext();

export const SettingList = ({ children }) => {
	const defaults = {
		name: "",
		darkMode: false,
		notifs: true,
		debtNotifs: true,
		payNotifs: false,
	};
	
	const listReducer = (state, action) => {
		switch (action.type) {
			case 'changeSetting':
				state[action.payload.name] = action.payload.newValue;
				return state;
			case 'reset':
				return { defaults };
			case 'totalRewrite':
				return action.payload;
			default:
				console.log("no action passed to Settings");
				return state;
		}
	};
	
	const [settings, dispatch] = useReducer(listReducer, defaults);
	
	const changeSetting = ( setting, newValue ) => {
		dispatch({type: "changeSetting", payload: {setting, newValue}});
	};
	const setSettings = ( settings ) => {
		dispatch({type: "totalRewrite", payload: settings});
	};
	
	return <Settings.Provider value={{settings, changeSetting, setSettings}}>{children}</Settings.Provider>;
};

export default Settings;
