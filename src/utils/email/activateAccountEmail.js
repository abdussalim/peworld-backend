const { htmlTemplateTop, htmlTemplateBottom } = require("./template");

const activateAccount = (link) => {
  const htmlContent = `
  <p>
    Anda menerima email ini karena Anda telah melakukan Registrasi Akun di Peworld.
    <br>
    Segera aktifkan akun Anda dengan click tombol di bawah ini.
  </p>
  
  <a href="${link}" style="color: white;" class="auth-button">Aktifkan Akun</a>
  
  <p>
    Jika Anda tidak merasa melakukan Registrasi Akun di Peworld, abaikan email ini.
    <br>
    Link alternatif: <a href="${link}">${link}</a>
  </p>
  
  <hr>
  
  <p>Copyright &copy; ${new Date().getFullYear()} Peworld - Developed with <span style="color: red !important;">❤️</span> by <a style="text-decoration: none;" href="https://github.com/abdussalim" target="_blank">Abdus Salim</a> in Central Kalimantan</p>`;

  return htmlTemplateTop + htmlContent + htmlTemplateBottom;
};

module.exports = activateAccount;
