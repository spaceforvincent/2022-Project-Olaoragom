import { removeToken } from "../../apis/Auth";
import { Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/Auth";
import { useLayoutEffect } from "react";
import LoginScreen from "./LoginScreen";

const LogoutScreen = ({navigation}) => {
    // const dispatch = useDispatch()

    // const logout = async() => {
    //     try {
    //         dispatch(authActions.logout())
    //         removeToken()
    //         console.log('로그아웃')
    //         }
    //     catch (error) {
    //         console.log(error)
    //     } 
    // }

    // useEffect(() => {
    //     logout
    // }, [])

    return(
        <View>
            <Text>얍</Text>
        </View>
    )
}

export default LogoutScreen