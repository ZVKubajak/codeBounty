 # codeBounty

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
codeBounty is a freelance platform designed to connect developers, UI/UX designers, and data analysts with clients who need their expertise. Whether it's building robust SQL databases, designing intuitive user interfaces, or developing complex applications, codeBounty provides a seamless and user-friendly experience for both clients and freelancers. Our platform fosters collaboration, streamlines project management, and helps build meaningful professional connections.

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [Questions](#questions)
- [Credits](#credits)
- [License](#license)

## Usage
Checkout the deployed site at [https://codebounty-production.up.railway.app](https://codebounty-production.up.railway.app). Users can choose to be a client or developer. Clients can post job listings with a title, description, category, and price. Developers can show off their skills and projects and can apply to posted jobs.

Client users have the ability to review the developers that have applied for the job and choose which one to work with. Once a developer is chosen, the client will be given the developer's email to further contact them.

## Home Page
![Screenshot 2024-11-25 at 1 42 49 PM (3)](https://github.com/user-attachments/assets/51284392-0872-442c-99af-cb96ab21125e)

## Explore Page
![Screenshot 2024-11-25 at 1 42 55 PM (3)](https://github.com/user-attachments/assets/78fbbbb3-34dc-4535-821b-b57d81806309)

## Find Work Page
![Screenshot 2024-11-25 at 1 42 59 PM (3)](https://github.com/user-attachments/assets/76295c6e-08ff-42be-a3ff-c02ea0ab6599)

## Installation
Requirements:
* npm v10.9.2
* JWT Secret Key
* MongoDB URI

To install the source code for **codeBounty**, clone the repository locally using `git clone git@github.com:ZVKubajak/codeBounty.git` and navigate to the project directory with `cd codeBounty`.

Install all dependencies by running `npm run install`. Navigate to the server with `cd server`, and create a .env file with variables `JWT_SCRET_KEY` and `MONGODB_URI`. Add the requirements respectively.

Navigate back to the root of the project with `cd ..`, and seed the database with `npm run seed`. You might also need to add localhost prefixes in front of the client endpoints.

Then start the development server with `npm run start:dev`. You're now ready to explore and use the app locally!

## Questions
If you have any questions, you can reach out to the team at [zvkubajak@gmail.com](mailto:zvkubajak@gmail.com), [bryceberczik.dev@gmail.com](mailto:bryceberczik.dev@gmail.com), [Youngjarvis24@gmail.com](mailto:Youngjarvis24@gmail.com), and [j.hebenstreit.developer@gmail.com](mailto:j.hebenstreit.developer@gmail.com).

## Credits
Created by Zander Kubajak, Bryce Berczik, Jarvis Young, and Justin Hebenstreit.

- [ZVKubajak](https://github.com/ZVKubajak)
- [bryceberczik](https://github.com/bryceberczik)
- [jarvisyoung24](https://github.com/jarvisyoung24)
- [JHebenstreit48](https://github.com/JHebenstreit48)

## License
This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.

© 2025 codeBounty. All rights reserved.
