# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] A link appears in the navigation to register as a new user (only when not logged in)
- [ ] A link appears on the login page to register as a new user (only when not logged in)
- [ ] When an unregistered user clicks on the registration link/button, they are prompted to enter a desired username, email address, and password, and to confirm their password.
- [ ] If the registration information is invalid, the unregistered user is alerted of the errors in their input(s).
- [ ] If the registration information is valid, a new user is created and the user is logged in.
- [ ] Once successfully registered and logged in, the user is redirected to their profile/splash page and links to post reviews, view their reviews, post recipes, view their recipes, view their collections will appear.

### Log In

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email or username and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log in form.
      * So that I can seamlessly access the site's functionality.
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] User can enter email and password in a login form.
- [ ] Upon successful completion of the log-in form, the website will redirect user to the homepage of the website.
- [ ] When user enters invalid data on the login form, the page will inform user of the failed validations and repopulate the form with the valid entries (except password), so that the user can try again without needing to refill every input field.
- [ ] When clicking the add or update information, the page will render a form for the user to update the information.
- [ ] When a user submits the form, they will be able to view their new profile information without needing to refresh the page.
- [ ] A user may not update profile features of other users.

### User Profile Pages

* As an authenticated user, I want to be able to see other user's profile pages.
  * When I'm on the `/users/:userId` page:
    * I would like to be able to see their username, profile icon, description, photostream, and their albums (if any).
    * I should not be able to edit the profile of a person who is not me.
* When I am logged in, I want to see a button to navigate to my own user profile (`/users/:userId`).
* When I navigate to my own user profile (`/users/:userId`), I would like to be able to see a button to edit my profile.
* When I click on the button, I would like to see a form to edit my profile. The form will pre-populate with my current data.
  * When I enter invalid data on the `Edit Profile` form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

#### Acceptance Criteria

- [ ] A link appears in the navigation to register as a new user (only when not logged in)
- [ ] When a user creates an image, a link appears in the `/images/:imagesId` page that directs to that person's user profile.
- [ ] When an authorized user navigates to their user profile page (`/users/:userId`), they will see a button to edit their user profile.
    - [ ] An unauthorized user will not be able to edit a profile.
- [ ] When editing their profile, if any information is invalid, the user is alerted of the errors in their input(s).
    - [ ] The user will not be able to submit the form if invalid data are present in the `Edit Profile` form.
- [ ] Once the user's profile is successfully updated, the user is redirected to their profile/splash page.

### Log Out

* As a logged in user, I can log out of my account so I can ensure that it isn’t used without my permission.
    * When I am on any page and I am logged in, I would like to be able to click a button in the navigation bar to log out.
* When I click the log out button and navigate to a different page, I should remain logged out.
* When I am logged out, I can log in with a different account.
* When I am logged out, I should be able to log back in.

#### Acceptance Criteria

- [ ] When the user is logged in, a button appears in the navigation bar to log out.
- [ ] When the user clicks this button, the session ends and the user is logged out.
- [ ] When refreshing the page or traveling to other pages the user does not appear to be logged in.
- [ ] The logged out user can log in with a separate account without issue.

### Demo User Enablement

* As an unregistered and unauthorized user who wants to demo Recipeople, I can enter the site via a single-button click on the login and signup form
    * so that I can view features of the website without creating an account.

#### Acceptance Criteria
- [ ] On the login page, any user can view a “Log in as Demo User” button.
    - [ ] Upon clicking the button, the user can access all features of the site with session-based authentication.

## Images

### Create Images
* As a logged in user, when I am on the `/images` page, I can upload images to share with other users.
    * I can see a `Upload Image` button when I am on the `/image` page.
* When I click the `Upload Image` button, I see a form for uploading a new image.
* When I enter invalid data on the `Upload Image` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I can see a button to submit the image.

#### Acceptance Criteria.
- [ ] A logged in user who is on the `/images` page, the users sees a `Upload Image` button.
- [ ] When clicking the button, takes user to a form for uploading image
- [ ] Form has inputs where the user can enter the name of the image and the image URL.
- [ ] When user enters invalid data on the login form, the page will inform user of the failed validations and repopulate the form with the valid entries (except password), so that the user can try again without needing to refill every input field.
- [ ] A button to submit the image will appear at the bottom of the form.
- [ ] When a user submits the image, the user will be redirected to `/images/:imagesId`, where it can be viewed by other users.

### Viewing images
* As a logged in or logged out user, I can view the most recently posted images.
* If I am not the creator of the image, I will not be able to edit the image.

#### Acceptance Criteria
- [ ] When any user is on home page, the user can see most recent 9 images.
- [ ] The user can click on a image to view its details (name, description).
- [ ] Only the user who created the image can edit the image if they are logged in.

### Editing Images
* As a logged in user visiting `/images/:imageId`, I can edit the images that I have created
    * so that I can fix any errors or make changes to the image.
* I should not be able to edit any images that I have not created.

#### Acceptance Criteria
- [ ] When the user is viewing a image that they have created, the user can click a button to edit the image.
- [ ] When pressing the button, the user will be taken to a pre-filled form with the image’s information. The user can then change any of the sections that the user would like.
- [ ] When the user presses the submit button, the image will update and the changes will be shown on the website.
- [ ] When viewing a image that the user did not create, the user will not be able to edit the image.

### Deleting Images
* As a logged in user visiting `/images/:imageId`, I can delete the images that I have created
    * so that when I no longer want to share an image with others, I can remove it.
* I should not be able to delete any images that I have not created.

#### Acceptance Criteria
- [ ] When the user is viewing a image that they have created, the user can click a button to delete their image.
- [ ] The image will be deleted from the database and will no longer appear on the app.

## Albums

### Creating an Album
* As a logged in user, I can create albums in which to store images.
* When I am viewing my profile page, in order to create a new album, I can click a button to create a new album and a `Create a New Album` form will appear.
* When I am viewing a recipe and don't have any albums, I can see a button to create a new album.
    * When I click this button, a `Create a New Album` form will pop up and allow me to create a new album.
* When I enter invalid data on the `Create a New Album` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.

#### Acceptance Criteria
- [ ] As a user I can go to my user page and click a button to create a new album.
- [ ] The button will pop up a form for the user to put the name in for the new album.
- [ ] A user can also create an album if they don’t have any albums when viewing an image. A create album button will appear instead of the option to add to an album.


### Adding Images to a Album
* As a logged in user, and I am viewing an image on the `/images/imageId` page, I can add images to an album
    * so that I have the images that I want in an album.
* When I am viewing an image, I have the option to use a dropdown menu to add the image to an existing album of mine.
    * I should be able to see an `Add to Album` button.
* When I click the `Add to Album` button, the image will be saved to the album that I selected.

#### Acceptance Criteria
- [ ] When viewing a recipe on the `/images/:imageId` page, the user has the option to use a dropdown to select an existing album of theirs.
- [ ] When the user clicks an `Add` button, the recipe will be added to the selected album.

### Removing Recipes from a Album
* As a logged in user and viewing a specific album of mine on the `/albums/:albumId` page, I can remove images from an album
    * so that I only have the images that I want in an album.
* I will see a `Remove from Album` button.
    * When I click this button, the recipe will disappear from the album.
* If I change my mind, I can add the recipe to the same album again when I am viewing the recipe on the `/images/:imageId` page.

#### Acceptance Criteria
- [ ] When viewing an album on the `/albums/:albumId` page, the user can remove recipes from the album.
- [ ] When the user clicks the `Remove from Album` button, the recipe will disappear from the album.
- [ ] The user can add the recipe back to the same album when they are viewing the recipe on the `/recipes/:imageId` page.

### Deleting a Album
* As a logged in user and viewing my album on the `/albums/:albumId` page, I can delete the entire album when I no longer have a use for it.
* I will only see a `Delete Album` button if I am the user who created the album.
* When I click the `Delete Album` button, the album will no longer exist.
* If I try to navigate to the URL of the album that I have deleted, I will get a `404` error.
* I will not be able to delete the albums that other users have created.
* I will be able to create a new album with the same name as the album that I have deleted.

#### Acceptance Criteria
- [ ] When a user is viewing an album that they have created on the `/albums/:albumId` page, a `Delete Album` button appears.
- [ ] The user will only see a `Delete Album` button if they are the user who created the album.
- [ ] When the user clicks the `Delete Album` button, the album will be deleted.
- [ ] If the user tries to navigate to the URL of the album that they have deleted, they will get a `404` error.
- [ ] A user cannot delete an album they they have not created.
- [ ] A user will be able to create a new album with the same name as the album that they have deleted.

<!--
## Recipe Reviews

### Creating a Review for a Recipe
* As a logged in user, when I am viewing a recipe on the `/recipes/:recipeId` page, I can leave a review on any recipe
    * so that all users can see my rating and review.
* I will be able to see a `Leave a Review` button.
* When I click the `Leave a Review` button, I will see a form where I can enter my recipe rating and reviews.
* I will be able to upload an optional image for the review.
* When I enter invalid data on the `Leave a Review` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I will see a `Submit` button for my review.
* When I click on the `Submit` button, my review will appear on the page
    * If I have uploaded an image, it will also appear on the page.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a `Leave a Review` button.
- [ ] When logged in users click on the `Leave a Review` button, they will see a form in which to enter a review.
- [ ] When users enter invalid data on the `Leave a Review` form, the page will inform them of the failed validations and repopulate the form with the valid entries.
- [ ] Users will see a `Submit` button for their review.
- [ ] Users will be able to upload an image.
- [ ] When the user submits their review, the review will appear on the page.

### Viewing Reviews of a Recipe
* As a logged in or logged out user, when I am on a recipe’s (`/recipes/:recipeId`) page, I can view all reviews of the recipe
    * to determine whether I'd like to add it to a collection.
* As a logged-in user, when I am viewing my user page (`/users/:userId`), I can view my 9 most recent reviews for any recipe.

#### Acceptance Criteria
- [ ] An authenticated or unauthenticated user can view all reivews on any recipe when viewing the `/recipes/:recipeId` page.
- [ ] When an authenticated user is viewing their user page (`/users/:userId`), they can view their 9 most recent reviews for any recipe.

### Editing a Review of a Recipe
* As an authenticated user, when I am viewing the recipe reviews on the `/recipes/:recipeId` page, I can edit the reviews that I created
    * so that I can fix any errors or make changes to a review that I had written prior.
* I will see an interactable `Edit Review` button next to reviews that I created.
* I will not be able to edit a review that I did not create.
* When I clicked the `Edit Review` button, a form will pop up that will have the review in its current state in an editable text box.
* When I enter invalid data on the `Edit Review` form, the page will inform me of the failed validations and repopulate the form with the valid entries
    * so that I can try again without needing to refill every input field.
* I will see a `Submit` button for my review.
* When I click on the `Submit` button, my review will appear on the page
    * If I have uploaded an image, it will also appear on the page.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see an interactable `Edit Review` button next to reviews that they have created.
- [ ] After pressing the button, they will see a form that is pre-filled with their review’s information. They can then change any review fields and re-submit if all required fields are provided.
- [ ] Only the user who has left the review will be authorized to edit the review.
- [ ] When the authorized user clicks the `Edit Review` button, a form will pop up that will have the review in its current state in an editable text box.
- [ ] When users enter invalid data on the `Edit Review` form, the page will inform them of the failed validations and repopulate the form with the valid entries.
- [ ] Users will see a `Submit` button for their review.
- [ ] Users will be able to upload an image.
- [ ] When the user submits their edited review, the review will appear on the page.

### Deleting a Review of a Recipe
* As a logged in user, when I am viewing reviews of a recipe on the `/recipes/:recipeId` page, I can delete the reviews that I have added,
    * so that when I no longer want my review to be displayed publicly, I can remove it from the site.
* I will be able to see an interactable `Delete Review` button next to the reviews that I have created.
* If I click the `Delete Review` button, my review will be deleted and will not appear on the page.
* I will not be able to delete another user's review.
* I will be able to leave another review for the same recipe without any issues.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see an interactable `Delete Review` button next to reviews that they have created.
- [ ] After pressing the `Delete Review` button, the review will disappear.
- [ ] Only the user who has left the review will be authorized to delete the review.
- [ ] The user will be able to leave another review for the same recipe.

## Interactivity:  "Cooked" vs. "Will Cook"
### Assign a Recipe as “Cooked”
* As a logged in user, I can mark a recipe as “cooked” so that I know that I have tried making this recipe before.
* When I am viewing a recipe, I will see a `Cooked` button that I can click to indicate that I have cooked the recipe.
* The `cooked` status will be retained when I visit the `/recipes/:recipeId` page again.
* I can view all of the recipes that I have marked as "cooked" from my user page (`/users/:userId`) when I am logged in.
#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a “Cooked” button.
- [ ] When logged in users click the “Cooked” button it will change color so that whenever they are on the `/recipes/:recipeId` page, that color will indicate they have indicated it as “cooked”.

### Unassign a Recipe as “Cooked”
* As a logged in user, when I am viewing a recipe on the `/recipes/:recipeId` page, I can unmark a recipe as “cooked” in case I mistakenly marked it as cooked.
* When I am viewing a recipe, I see a button that indicates “cooked” and I may click it to undo its “cooked” status.
* If I see that recipe again, the recipe will no longer have a small icon next to it indicating “cooked”.
* Also, if a recipe currently has the "cooked" status, if I click on "will cook," the recipe will now have the "will cook" status and no longer have the "cooked" status.
* I can mark the same recipe as "cooked" if I had previously unmarked it as "cooked."
* Recipes that are no longer marked as "cooked" will disappear from the list of "cooked" recipes on my user page.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a “Cooked” button with a color that indicates “cooked”.
- [ ] When logged in users click the “Cooked” button it will change to the original color so that it is no longer marked as “cooked”.
- [ ] When users toggle off from from the "Cooked" status, the recipe will no longer appear in their "cooked" collection.
- [ ] Users can mark the same recipe as "cooked" if they had previously marked and unmarked it as "cooked."

### Assign a Recipe as “Will Cook”
* As a logged in user, when I am viewing a recipe on the `/recipes/:recipeId` page, I can mark a recipe as “will cook” so that I can mark that I would like to try it in the future.
* When I am viewing a recipe, I will see a `Will Cook` button that I can click to indicate that I want to cook the recipe.
* The `will cook` status will be retained when I visit the `/recipes/:recipeId` page again.
* I can view all of the recipes that I have marked as "will cook" from my user page (`/users/:userId`) when I am logged in.
* Recipes that are no longer marked as "will cook" will disappear from the list of "will cook" recipes on my user page.

#### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a “Will Cook” button.
- [ ] When logged in users click the “Will Cook” button it will change color so that whenever they are on the `/recipes/:recipeId` page, that color will indicate they have indicated it as “Will Cook”.
- [ ] Logged-in users can view recipes that they have marked as "will cook" when they navigate to their user page (`/users/:userId`).

### Unassign a Recipe as “Will Cook”
* As a logged in user, I can unmark a recipe as “will cook” in case I mistakenly mark something as “will cook” or have cooked a recipe that was previously marked as “will cook”.
* When I am viewing a recipe, I see a “will cook” button that I can click that is the color indicating it has been clicked before.
* I can click “will cook” so that it changes to its original unclicked color or I can click the “cooked” button which will also change the “will cook” button to its original unclicked color.
* I can mark the same recipe as "will cook" if I had previously unmarked it as "will cook."

### Acceptance Criteria
- [ ] When logged in users are viewing a recipe on the `/recipes/:recipeId` page, they will see a “Will Cook” button that is colored to indicate it has been clicked before.
- [ ] When logged in users click the colored “Will Cook” button it will change color so that whenever they are on the `/recipes/:recipeId` page, that color will the button has not been clicked.
- [ ] When logged in users click click the "cooked" button on a recipe currently marked as "will cook," the “will cook” button to its original unclicked color.
- [ ] Logged in users can mark the same recipe as "will cook" if they had previously marked and unmarked it as "will cook." -->
