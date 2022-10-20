### HAL-HAL YANG HARUS DILAKUKAN
0. Buka terminal, kemudian arahkan path ke folder <FE-ARTICLE>
1. Lakukan 'npm install' terlebih dahulu
2. Setelah melakukan 'npm install', dilanjutkan dengan perintah 'npm start'
3. Tunggu sebentar, react js nya akan menjalankan localhost:3000.
4. Setelah localhost tersebut nyala, tekan link di teriminal atau masukan link tersebut ke brower 'localhost:3000'
5. Ketika website tersebut muncul, abaikan saja 'Compiled with problems: ERROR dari [eslint]'. 
    Error tersebut muncul karena ada variabel atau element yang tidak tergunakan.
6. Pada bagian front-end, halaman ini hanya memiliki dua menu di bagian SideBar, yaitu All Post dan SideBar.
7. Pada menu All Post, halaman ini adalah halaman yang berisi fitur untuk membuat artikel baru, melihat post-post artikel yang sudah dibuat dan dibagi berdasarkan status, yaitu: publish, draft, dan trash.
    Selanjutnya data tersebut ditampilkan dalam bentuk tabel yang berisi title, category, dan action.
    Pada bagian atas tabel berisi sejumlah data dari status artikel tersebut, Contoh: Artikel
     dengan status publish ada 5, draft ada 3, trash ada 2. 
        Fungsi fitur ini untuk mempermudah user mengetahui jumlah artikel berdasarkan status.
        
    Action dibagi menjadi dua macam, yaitu: edit dan trash.
        Edit, untuk mengupdate data artikel
        Trash, untuk memindahkan artikel ke status trash.

    Kemudian, untuk menghapus artikel dapat dilakukan dengan cara:
        a. Pilih tab ke 'trash'
        b. Kemudian, di bagian tabel Action, ada tombol bernama Delete. Tombol tersebut berfungsi 
            untuk menghapus data artikel dari database.
    
    Untuk fitur tombol trash ataupun delete, jika user menekan tombol delete, maka akan keluar
        sebuah modal yang berisi data artikel dan user harus memastikan terlebih dahulu, bahwa data
        tersebut benar-benar akan dipindahkan ke trash atau dihapus. Ada juga formulir tersebut
        tidak dapat diganti atau diedit.

    Untuk fitur edit, data artikel akan dilampirkan di input formulir tersebut. User hanya tinggal 
    mengecek atau menggantinya dengan data baru.

    Untuk fitur new article berfungsi untuk membuat artikel baru.

8. Pada menu Preview, halaman ini adalah halaman yang menampilkan artikel yang berstatus publish dan
    bentuk artikel tersebut ditampilkan dalam bentuk blog tetapi pada kasus pengerjaan ini. Saya 
    membuatnya dalam bentuk card. 

    Ada pagination juga yang berfungsi untuk pindah ke halaman selanjutnya, tujuannya agar
    seluruh artikel dibagi berdasarkan pagination dan tidak menumpuk dalam satu halaman yang nantinya
    membuat repot untuk scroll terus-terusan

9. Selamat menjalankan program react-js.