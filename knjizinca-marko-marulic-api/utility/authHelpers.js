
import jwt from "jsonwebtoken";

//Pri pozivima gdje je token potreban treba se dodati ova linija u fetch -> Authorization: "Bearer " + localStorage.getItem("token")
const verifyToken = (req, res, next) => {
    const authorization = req.header("authorization");
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;

    if (!token) {
        return res.status(401).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, "gradskaknjiznjicamarkamarulicatajnasifra");
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

const verifyPermissionMember = (req, res, next) => {
    User.findById(req.user.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (user.role_id > 4) {
                return res.status(403).send("No Member Rights");
            } else {
                return next();
            }
        }
    })
}

const verifyPermissionLibrarian = (req, res, next) => {
    User.findById(req.user.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (user.role_id > 3) {
                return res.status(403).send("No Member Rights");
            } else {
                return next();
            }
        }
    })
}

const verifyPermissionAdmin = (req, res, next) => {
    User.findById(req.user.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (user.role_id > 2) {
                return res.status(403).send("No Member Rights");
            } else {
                return next();
            }
        }
    })
}

export { 
    verifyToken,
    verifyPermissionMember,
    verifyPermissionLibrarian,
    verifyPermissionAdmin
}
