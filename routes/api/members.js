// Using express router

const express = require("express");

// to generate id
const uuid = require("uuid");

const router = express.Router();

// bringing the data for members
const members = require("../../Members");

// Creating a route, creating a simple REST api that gets all members
// using router.get instead or app.get as I am using router
// replaced "/api/members" with "/" and I have it in the index.js file in "app.use("/api/members", require("./routes/api/members"));"
router.get("/", (req, res) => {
  res.json(members);
});

// Getting a single member
// using router.get instead or app.get as I am using router
// replaced "/api/members" with "/:id" and I have it in the index.js file in "app.use("/api/members", require("./routes/api/members"));"
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    // used parseInt as req.params.id returns a string and I am using strict equality
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    //   returning 400 bad request and a message when the user enters a non existing id
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create a member
// using just "/" here as I want to hit /api/members
// Note: same routes can be used as long as they are different methods
router.post("/", (req, res) => {
  // creating a new member, using uuid to generate id
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  //   making sure that the email and name are sent with the request
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  // pushing the new member to our array
  members.push(newMember);

  // responding back with the whole updated list of members
  res.json(members);

  // In most cases this is what we do instead of the above res.json(members) (redirect to the same page where we can see new member added)
  // res.redirect("/");
});

// Update member
// put request to update something on the server
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;

    // I want to loop through the members that I have and then check to see if it matches the id, if it does, thats the one I want to update
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        //   setting member name and email depending on whats sent
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    //   returning 400 bad request and a message when the user enters a non existing id
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Deleting a member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    //   returning 400 bad request and a message when the user enters a non existing id
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
