# PetsPurration

![PetsPurration Home](/gitHubImg/frontPage.png)

- - -
[PetsPurration](https://boiling-everglades-73840.herokuapp.com/) is Live! :paw_prints:
- - -

## Overview

PetsPurration is a Node Express application hosted on Heroku. It utilizes Handlebars, a template engine, for generating HTML and JawsDB for a persistent MySQL Database functionality. It also uses Passport and bcrypt for User authentication.

The goal of PetsPurration is to allow a User to sign up, sign in, view pets that are up for adoption, and adopt the pets that they would love to have. Adopted pets disappear from the list, and the User can see adopted pets.

### Features

When the User accesses the site, the can view all pets up for adoption. Each pet comes with a photo, if available, name, breed, age, size, gender, and location. The User can then sort pets by gender, age, and size if they want. To adopt a pet, the User must Sign Up (which automatically signs them in) or Sign In. If the User is signed in, then they can click the "Adopt Me" button to adopt a pet. When signing up, the User must enter a valid email address and password, but can also enter their name, phone number, city, housing type, and user name.

- - -

When the User successfully signs up, they are redirected to the "Dashboard", which is a work in progress. When logged in, however, their status changes to "active" and the time of their login is stored.

- - -

When the User clicks "Adopt Me", the page should refresh automatically. When filtering pets, a single click applies the filter, while re-clicking removes the filter and clicking a different filter of the same category changes the filter. Once pets are adopted, they no longer show in the list and can be seen only on the "/adopted" page.

- - -

When the User logs out, their status changes to "inactive".

#### Dependencies

PetsPurration uses express to structure its server and relies and handlebars for rendering its page client-side. The database is managed by MySql, while communication with the database is done with Sequelize. For User authentication, Passport is used, along with bcrypt for password hashing, and session for tracking login sessions.

#### Models

PetsPurration relies on two Sequelize models. The first, Pet, includes 'name', 'photo', 'breed', 'age', 'size', 'gender', 'location', and  'adopted'. The Pet model is then associated via "belongsTo" to the User model, where allowNull is true.

The second, User, includes 'firstname', 'lastname', 'username', 'phone', 'location', 'housing', 'email', 'password', 'last_login', and 'status'.

### Future Features

In the future, PetsPurration would like to have more vigorous User profiles that can be edited, photos added, and adopted pets shown. The nav bar should change to reflect the log-in status of the user and allow the user to see their profile or log out.

The adopted page should include the User that adopted the pet.

Users should be able to join with the intention of putting a pet up for adoption. This would include a second User model. This User would have to enter all the information about their pet.

We would like to expand to different pets, not just dogs.
