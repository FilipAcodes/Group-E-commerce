# Backend

### GET METHOD:

1. `"/api-getitems"` returns ALL OF THE ITEMS, standard GET
2. `"/api-getcompanies"` returns ALL OF THE COMPANIES, standard GET
3. `"/item/:_id"` returns a SPECIFIC ITEM, standard GET
4. `"/company/:_id"` returns a SPECIFIC COMPANY, standard GET
5. `"/specificuser/:email"` returns a SPECIFIC USER
6. `"/users"` returns ALL OF THE USERS, standard GET

### POST METHOD:

1. `"/addproduct"`, this needs a body of {email: "the email", itemId:"the item's ID"} if no email or itemId is provided, it will return a 404, if there is no email in the database, it will be created. If there's arleady the same itemId in the same email, it will increment.
2. `"/createuser"`, this endpoint needs a body of{email: "the email"}, if the user is not created, it will be created with an empty cart, this mainly gonna be used at the very start to prevent bugs with users clicking on the cart on their first login.

### DELETE METHOD:

1. `"/removeproduct"`, same idea as above. Body needs to be {email: "the email", itemId:"the item's ID"}. It will decrement everytime it is called, if the quantity is 0, it will be removed.
2. `"/deleteproduct"`, Body needs to be {email: "the email", itemId:"the item's ID"}. Self explanatory, probably will attach this to a trash Icon, it removes the item, regardless of the quantity.
3. `"/completepurchase"`, Body needs to be {email : "the email"} Only use this on the cart Checkout Page as it will delete the User's Cart completely
