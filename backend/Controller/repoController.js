const createRepo=(req,res)=>{
    res.send("Repository created");
}

const getAllRepos=(req,res)=>{
    res.send("All repositories fetched");
}

const fetchRepoById=(req,res)=>{
    res.send("Repository fetched by ID");
}

const fetchRepoByName=(req,res)=>{
    res.send("Repository fetched by name");
}

const fetchRepoForCurrUser=(req,res)=>{
    res.send("Repository fetched for current user");
}

const UpdateRepoById=(req,res)=>{
    res.send("Repository updated by ID");
}

const deleteRepoById=(req,res)=>{
    res.send("Repository deleted by ID");
}

const toggleRepoById=(req,res)=>{
    res.send("Repository toggled by ID");
}


export const repoController={
    createRepo,
    getAllRepos,
    fetchRepoById,
    fetchRepoByName,
    fetchRepoForCurrUser,
    UpdateRepoById,
    deleteRepoById,
    toggleRepoById
}