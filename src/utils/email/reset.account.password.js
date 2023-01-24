const { htmlTemplateTop, htmlTemplateBottom } = require("./template.email");

const resetAccountPassword = (fullname, link) => {
  const htmlContent = `
  <p style="font-size: 20px;">Halo, ${fullname}!</p>
    <hr>
  <p>
    Anda menerima email ini karena Anda telah melakukan permintaan Reset Password di Peworld.
    <br>
    Segera ubah password Anda dengan click tombol di bawah ini.
  </p>
  
  <a href="${link}" style="color: white;" class="auth-button">Reset Password</a>
  
  <p>
    Jika Anda tidak merasa melakukan permintaan Reset Password di Peworld, abaikan email ini.
    <br>
    Link alternatif: <a href="${link}">${link}</a>
  </p>
  
  <hr>
  
  <p>Copyright &copy; ${new Date().getFullYear()} Peworld - Developed with <span style="color: red !important;">❤️</span> by <a style="text-decoration: none;" href="https://github.com/abdussalim" target="_blank">Abdus Salim</a> in Central Kalimantan</p>`;

  return htmlTemplateTop + htmlContent + htmlTemplateBottom;
};

module.exports = resetAccountPassword;
