function generateLink() {
    // Mengambil nama dari input
    const name = document.getElementById("guestName").value.trim();
    
    // Jika nama kosong, tampilkan pesan peringatan
    if (!name) {
        alert("Please enter a guest name.");
        return;
    }

    // Menghasilkan link dengan parameter nama
    const baseUrl = "https://ZuldanTika.github.io/ulp/";
    const generatedLink = `${baseUrl}?name=${encodeURIComponent(name)}`;

    // Menampilkan link yang dihasilkan
    const linkOutput = document.getElementById("generated-link");
    linkOutput.innerHTML = `Generated Link: <a href="${generatedLink}" target="_blank">${generatedLink}</a>`;
}

// Referensi ke Firebase Realtime Database
// Referensi ke Firebase Realtime Database
var commentsRef = firebase.database().ref('comments');

// Fungsi untuk menghapus semua komentar dari Firebase
function clearComments() {
    if (confirm('Are you sure you want to delete all comments?')) {
        commentsRef.remove()
            .then(() => {
                alert('All comments have been deleted.');
                displayComments(); // Memperbarui tampilan komentar setelah dihapus
            })
    }
}

// Fungsi untuk menampilkan semua komentar dari Firebase (untuk keperluan admin)
function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = ''; // Kosongkan daftar komentar

    commentsRef.on('value', (snapshot) => {
        commentsList.innerHTML = ''; // Kosongkan daftar sebelum menampilkan data baru
        let comments = snapshot.val();

        if (comments) {
            for (let id in comments) {
                const comment = comments[id];
                // Buat elemen div untuk setiap komentar
                const commentElement = document.createElement('div');
                commentElement.className = 'comment-item';
                commentElement.innerHTML = `
                    <strong>${comment.name}</strong> 
                    <small>(${new Date(comment.date).toLocaleString()})</small>
                    <p>${comment.text}</p>
                `;
                commentsList.appendChild(commentElement); // Tambahkan komentar ke daftar
            }
        } else {
            commentsList.innerHTML = '<p>No comments available.</p>';
        }
    });
}

// Inisialisasi untuk menampilkan komentar setelah halaman dimuat (jika diperlukan)
window.onload = function() {
    displayComments();
};

