
document.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('background-music');
    const scrollButton = document.querySelector('.scroll-button');
    
    // Mencegah scroll pada halaman sebelum tombol diklik
    document.body.classList.add('no-scroll');

    // Mengaktifkan scroll dan memainkan musik setelah tombol diklik
    scrollButton.addEventListener('click', () => {
        document.body.classList.remove('no-scroll'); // Mengaktifkan scroll
        if (audio.paused) {
            audio.play(); // Memainkan musik
        }
    });

    // Mencegah scroll dengan event listener di window
    window.addEventListener('scroll', (event) => {
        if (document.body.classList.contains('no-scroll')) {
            window.scrollTo(0, 0); // Mengembalikan scroll ke posisi awal
        }
    });


    // Smooth scroll to section
    document.querySelectorAll('.scroll-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Mengatur slider untuk berulang tanpa batas
    const slides = document.querySelectorAll('.slider-photo');
    let currentIndex = 0;

    function startSliderLoop() {
        setInterval(() => {
            const currentSlide = slides[currentIndex];
            const nextIndex = (currentIndex + 1) % slides.length;
            const nextSlide = slides[nextIndex];

            // Hapus semua kelas animasi sebelumnya
            currentSlide.classList.remove('enter-left', 'enter-right', 'active');

            // Tentukan arah masuk dan keluar
            if (currentIndex % 2 === 0) {
                currentSlide.style.animation = 'slideOutLeft 1s forwards'; // Gaya keluar ke kiri
                nextSlide.style.animation = 'slideInRight 1s forwards'; // Gaya masuk dari kanan
            } else {
                currentSlide.style.animation = 'slideOutRight 1s forwards'; // Gaya keluar ke kanan
                nextSlide.style.animation = 'slideInLeft 1s forwards'; // Gaya masuk dari kiri
            }

            setTimeout(() => {
                currentSlide.classList.remove('active'); // Hilangkan gambar saat ini
                nextSlide.classList.add('active'); // Tampilkan gambar berikutnya
                currentIndex = nextIndex; // Update indeks gambar
            }, 3000); // Durasi waktu total untuk stay dan transisi
        }, 4000); // Interval waktu antar slide
    }

    startSliderLoop();
});

// Countdown Timer
const countdownDate = new Date("September 29, 2024 09:00:00").getTime();
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = `
        <div class="countdown-item">
            <div class="countdown-number"><b>${days}</b></div>
            <div class="countdown-label">Hari</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-number"><b>${hours}</b></div>
            <div class="countdown-label">Jam</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-number"><b>${minutes}</b></div>
            <div class="countdown-label">Menit</div>
        </div>
        <div class="countdown-item">
            <div class="countdown-number"><b>${seconds}</b></div>
            <div class="countdown-label">Detik</div>
        </div>
    `;
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("timer").innerHTML = "The wedding day is here!";
    }
}, 1000);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('fade-out');
            entry.target.classList.add('active', 'fade-in');
            entry.target.style.animation = 'fadeInUp 1s forwards';
        } else {
            entry.target.classList.remove('fade-in');
            entry.target.classList.add('fade-out');
            entry.target.style.animation = 'fadeOutDown 1s forwards';
        }
    });
}, observerOptions);

// Apply observer to each animate-on-scroll element
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Teks berhasil disalin: ' + text);
    }, function(err) {
        console.error('Gagal menyalin teks: ', err);
    });
}
window.onload = function() {
    // Mengambil parameter dari URL menggunakan URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Tamu Undangan'; // Default ke 'Tamu Undangan' jika tidak ada nama

    // Memeriksa apakah elemen dengan kelas .invitation-text ada
    const invitationText = document.querySelector('.invitation-text');
    if (invitationText) {
        // Memperbarui konten HTML dengan nama dari URL
        invitationText.innerHTML = `Kepada Yth. <br>Bapak/Ibu/Sdr/i<br>${name}<br>di Tempat`;
    }
};
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item-inner');
    setInterval(() => {
        galleryItems.forEach(item => {
            item.style.transform = item.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    }, 3000); // Flip images every 3 seconds
});
window.onload = function () {
    displayComments(); // Menampilkan komentar yang ada saat halaman dimuat

    // Tambahkan event listener untuk form komentar
    document.getElementById('comment-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Mencegah submit default
        saveComment(); // Simpan komentar
    });
};

function randomizeCommentHeight() {
    const commentItems = document.querySelectorAll('.comment-item');
    commentItems.forEach(comment => {
        // Mengatur tinggi minimum dan maksimum secara acak
        const minHeight = 80 + Math.floor(Math.random() * 50); // antara 80px - 130px
        const maxHeight = 130 + Math.floor(Math.random() * 50); // antara 130px - 180px
        comment.style.minHeight = `${minHeight}px`;
        comment.style.maxHeight = `${maxHeight}px`;
    });
}

// Gunakan Firebase yang telah diinisialisasi di file HTML
var commentsRef = firebase.database().ref('comments');

function saveComment() {
    const commentName = document.getElementById('comment-name').value.trim();
    const commentText = document.getElementById('comment-text').value.trim();

    if (commentName && commentText) {
        commentsRef.push({
            name: commentName,
            text: commentText,
            date: new Date().toISOString()
        });

        document.getElementById('comment-form').reset();
        displayComments();
    }
}

function displayComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    commentsRef.on('value', (snapshot) => {
        commentsList.innerHTML = '';
        let comments = snapshot.val();

        for (let id in comments) {
            const comment = comments[id];
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <strong>${comment.name}</strong>
                <small>(${new Date(comment.date).toLocaleString()})</small>
                <p>${comment.text}</p>
            `;
            commentsList.appendChild(commentElement);
        }
    });
}

document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    saveComment();
});

displayComments();


// JavaScript untuk mengganti gambar secara otomatis
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-image');

function switchImage() {
    galleryImages[currentImageIndex].classList.remove('active-img'); // Hapus class aktif dari gambar sekarang
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length; // Pindah ke gambar berikutnya, ulangi jika di akhir
    galleryImages[currentImageIndex].classList.add('active-img'); // Tambah class aktif ke gambar berikutnya
}

// Ganti gambar setiap 4 detik
setInterval(switchImage, 4000);
document.addEventListener("DOMContentLoaded", function () {
    const galleryRow = document.querySelector(".gallery-row");
    let clone = galleryRow.innerHTML; // Simpan duplikat konten

    // Gandakan konten
    galleryRow.innerHTML += clone;
});
document.addEventListener("DOMContentLoaded", function () {
    const imageRow = document.querySelector(".image-row");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("image-modal");
    const modalImage = document.querySelector(".modal-image");
    const closeModal = document.querySelector(".modal-close");
    const prevButton = document.querySelector(".modal-prev");
    const nextButton = document.querySelector(".modal-next");

    let currentImageIndex = 0;
    const totalImages = galleryItems.length;
    let isModalOpen = false;

    // Fungsi untuk membuka modal
    function openModal(index) {
        currentImageIndex = index;
        const imageUrl = galleryItems[currentImageIndex].style.backgroundImage.slice(5, -2);
        modalImage.src = imageUrl;
        modal.style.display = "block";
        isModalOpen = true; // Menandai bahwa modal sedang terbuka
    }

    // Fungsi untuk menutup modal
    function closeModalFunc() {
        modal.style.display = "none";
        isModalOpen = false; // Menandai bahwa modal sudah tertutup
    }

    // Fungsi untuk navigasi ke gambar berikutnya
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        openModal(currentImageIndex);
    }

    // Fungsi untuk navigasi ke gambar sebelumnya
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        openModal(currentImageIndex);
    }

    // Event listener untuk membuka modal ketika gambar diklik
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => openModal(index));
    });

    // Event listener untuk menutup modal
    closeModal.addEventListener("click", closeModalFunc);

    // Event listener untuk tombol navigasi modal
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", prevImage);

    // Event listener untuk menutup modal ketika klik di luar konten modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // Fungsi scroll otomatis
    function autoScroll() {
        if (!isModalOpen) { // Scroll hanya saat modal tertutup
            let currentTransform = getComputedStyle(imageRow).transform;
            let matrix = currentTransform.match(/matrix\((.*)\)/);
            let currentTranslateX = matrix ? parseFloat(matrix[1].split(', ')[4]) : 0;

            imageRow.style.transform = `translateX(${currentTranslateX - 1}px)`;

            if (currentTranslateX <= -imageRow.scrollWidth / 2) {
                imageRow.style.transform = 'translateX(0)';
            }
        }
    }

    // Set interval untuk scroll otomatis
    setInterval(autoScroll, 20);
});




