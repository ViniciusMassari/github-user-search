const input = document.querySelector("#search-user-input");
const searchButton = document.querySelector(".search-button");
const userInfo = document.querySelector(".user-info");
const errorMessage = document.querySelector(".error-message");

const events = ["click", "touchstart"];

function showUserInformation(user) {
  input.value = "";
  errorMessage.classList.remove("active");
  const userCreated = user.created_at.replace(
    /(\d{4})-(\d{2})-(\d{2})(?:T\d{2}\:\d{2}\:\d{1,}\w)/g,
    "$1/$2/$3"
  );
  const userUpdated = user.updated_at.replace(
    /(\d{4})-(\d{2})-(\d{2})(?:T\d{2}\:\d{2}\:\d{1,}\w)/g,
    "$1/$2/$3"
  );
  userInfo.innerHTML = "searching...";
  return setTimeout(() => {
    userInfo.innerHTML = ` <div class="user-image">
    <img
      src="${user.avatar_url}"
      alt="${user.name} profile photo"
    />
  </div>

  <p class="name">${user.name === null ? "" : user.name}</p>
  <p class="login">${user.login}</p>
  <div class="follow">
    <p class="following">Following: ${user.followers}</p>
    <p class="followers">Followers: ${user.following}</p>
  </div>

  <p class="bio">${user.bio === null ? "" : user.bio}</p>
  <p class="public-repos">public repositories: ${user.public_repos}</p>
  <div class="profile-information">
    <p class="profile-creation">Profile created at: ${userCreated}</p>
    <p class="profile-update">Last update at: ${userUpdated}</p>
  </div>

  <a
    class="visit-profile"
    target="_blank"
    href="${user.html_url}"
    >Visit complete profile</a
  >`;
  }, 1000);
}

async function searchForUser(event) {
  event.preventDefault();
  userInfo.innerHTML = "";
  try {
    const userInformation = await fetch(
      `https://api.github.com/users/${input.value}`
    );
    if (userInformation.status < 400) {
      const userJson = await userInformation.json();
      showUserInformation(userJson);
    } else {
      errorMessage.classList.add("active");
    }
  } catch (error) {
    userInfo.innerHTML = "";
    errorMessage.classList.add("active");
    console.log("oh no !");
  }
}

events.forEach((event) => {
  searchButton.addEventListener(event, searchForUser);
});
