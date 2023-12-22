import { StatusBar, StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'whitesmoke',
        paddingTop: StatusBar.currentHeight
    },
    titleStyle:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center' ,
        lineHeight: 40
    },
    textStyle:{
        fontSize: 16,
        fontWeight: 'normal',
        color: 'gray',
        textAlign: 'center' ,
        lineHeight: 25
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:"center",
        margin: 10
    },
    buttonPrimary:{
        backgroundColor: "blue",
        borderRadius: 10
    },
    buttonPrimaryText:{
        paddingVertical: 15, 
        paddingHorizontal: 40, 
        color: 'white',
        fontSize: 16,
        fontWeight:'600'
    },
    buttonSecondary:{
        backgroundColor: "white",
        borderRadius: 10
    },
    buttonSecondaryText:{
        paddingVertical: 15, 
        paddingHorizontal: 35, 
        color: 'black',
        fontSize: 16,
        fontWeight:'600'
    },
    buttonSubmit:{
        backgroundColor: 'blue',
        borderRadius: 10,
        width: '100%',
    },
    buttonSubmitText:{
        textAlign: 'center',
        paddingVertical: 15, 
        paddingHorizontal: 35, 
        color: 'white',
        fontSize: 18,
        fontWeight:'600'
    },
    label:{
        marginTop:0 ,
        marginBottom: 0,
        margin: 12,
        fontSize:16,
        fontWeight: '500'
    },    
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        backgroundColor: '#fff'
    }

    
})

export default styleSheet;