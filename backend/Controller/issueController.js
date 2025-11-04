const createIssue=(req,res)=>{ 
    res.send("issue created");
}

const updateIssue=(req,res)=>{ 
    res.send("issue updated");
}

const deleteIssue=(req,res)=>{ 
    res.send("issue deleted");
}

const getAllIssues=(req,res)=>{ 
    res.send("all issues fetched");
}

const getIssueById=(req,res)=>{ 
    res.send("issue fetched by Id");
}

const issueController={
    createIssue,
    updateIssue,
    deleteIssue,
    getAllIssues,
    getIssueById
}

export default issueController;