const templateStatus = (link, message, button) => {
  const template = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Aplikasi Peworld">
    <meta name="keywords" content="Peworld, Javascript, NodeJS, ExpressJS">
    <meta name="author" content="Abdus Salim">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
        @import "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";
        * {
        font-family: "Open Sans", sans-serif;
        box-sizing: border-box;
        }
        .auth-title {
        text-align: center;
        color: white;
        margin: 0;
        margin-top: 30px;
        margin-bottom: 10px;
        }
        .auth-content {
        border: 2px solid #0a1d37;
        border-radius: 3px;
        line-height: 50px;
        max-width: 1000px;
        margin: 0 auto;
        padding: 25px;
        }
        .auth-button {
        background-color: #293b5f;
        text-decoration: none;
        text-align: center;
        border-radius: 5px;
        font-weight: bold;
        margin: 0 auto;
        padding: 5px;
        display: block;
        width: 150px;
    }
    </style>
        <title>Verification Status</title>
    </head>

        <body style="background-color: #5E50A1; padding: 20px; text-align: center;">
        <h1 class="auth-title">
            Peworld Group
        </h1>
        <div class="auth-content" style="background-color: white;">
            <p style="font-size: 20px; padding-top: 2rem; padding-bottom: 1rem;">${message}</p>

        <hr>

        
        <a href="${link}" style="color: white; margin-top: 5rem; margin-bottom: 5rem;" class="auth-button">${button}</a>

        
        <hr>
        
        <p>Copyright &copy; ${new Date().getFullYear()} Peworld - Developed with <span style="color: red !important;">❤️</span> by <a style="text-decoration: none;" href="https://github.com/abdussalim" target="_blank">Abdus Salim</a> in Central Kalimantan</p>
            
    </div>
    </body>
    </html>
`;

  return template;
};

module.exports = templateStatus;
