function getRuleNAme(role){
    switch(Number(role)){
        case 0:
            return "You are logged in as a user.";
        case 1:
            return "You are logged in as a Manger.";
        case 2:
            return "You are logged in as a Edito.r";
        case 3:
            return "You are logged in as a Adinistrator.";
        default:
            return"You are logged in as user";


    }
}

function getRuleNAme(role){
    switch(Number(role)){
         case 0:
            return " user.";
        case 1:
            return " Manger.";
        case 2:
            return "Edito.r";
        case 3:
            return "Adinistrator.";
        default:
            return"User";
    }
}