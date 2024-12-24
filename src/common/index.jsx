import AllUsers from "../components/AllUsers"



const backendDomin = "https://student-backend-k96t.onrender.com"

const SummaryApi={
    signup:{
        url: `${backendDomin}/signup`,
        method: "POST"
    },
    login:{
        url: `${backendDomin}/login`,
        method: "POST"
    },
    userDetails:{
        url: `${backendDomin}/userDetails`,
        method: "GET"
    },
    newPost:{
        url: `${backendDomin}/new-post`,
        method: "POST"
    },
    question:{
        url: `${backendDomin}/question`,
        method: "POST"
    },
    addcomment:{
        url: `${backendDomin}/addcomment`,
        method: "POST"
    },
    getCommentDetails:{
        url: `${backendDomin}/getCommentDetails`,
        method: "POST"
    },
    newAnswer:{
        url: `${backendDomin}/new-answer`,
        method : "POST"
    },
    logout:{
        url: `${backendDomin}/logout`,
        method: "GET"
    },
    AllUsers:{
        url: `${backendDomin}/AllUsers`,
        method: "GET"
    },
    changeUserRole:{
        url: `${backendDomin}/changeUserRole`,
        method: "POST"
    },
    verifyanswer:{
        url: `${backendDomin}/verifyanswer`,
        method: "GET"
    },
    markverify:{
        url: `${backendDomin}/markverify`,
        method: "POST"
    },
    getanswer:{
        url: `${backendDomin}/getanswer`,
        method: "POST"
    },
    addcommenttoans:{
        url: `${backendDomin}/addcommenttoans`,
        method: "POST"
    },
    getPosts:{
        url :`${backendDomin}/getPosts`,
        method: "GET"
    },
     deletePost:{
        url : `${backendDomin}/deletePost`,
        method: "POST"
    }

}
export default SummaryApi
