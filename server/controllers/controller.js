var listToDo = 
["Wake Up",
"Brush Teeth",
"Eat Breakfast",
"Get Dressed",
"Work",
"Eat Lunch",
"Work",
"Eat Dinner",
"Sleep"
]

module.exports = {
    getUser: (req, res) => {
      if(req.session.user) {
        res.status(200).send(req.session.user)
      } else res.sendStatus(404)
    },
    changeToDos: (req, res) => {
        listToDo[0] = req.query.newItem;
        req.session.user = {
          name: req.user,
          list: listToDo
        };
        res.status(200).send(req.session.user);
    },
    login: (req, res) => {
        let { username } = req.body;
        if(username === process.env.USER_NAME) {
          req.session.user = {
            name: username,
            list: listToDo
          };
          res.status(200).send(req.session.user);
        } else {
          res.sendStatus(403);
        }
    },
    logout: (req, res) => {
        // req.session.destroy will destroy (delete) the session 
        req.session.destroy()
        res.sendStatus(200)
    }
}