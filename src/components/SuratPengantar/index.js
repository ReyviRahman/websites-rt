import React, { useState } from 'react'
import { db, storage, COLLECTION_BERKAS } from '../../config/firestore'
import Swal from 'sweetalert2'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Untuk Firebase Storage
import { collection, addDoc } from "firebase/firestore"; 

const SuratPengantar = () => {
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [ttl, setTtl] = useState('');
  const [agama, setAgama] = useState('');
  const [status, setStatus] = useState('');
  const [alamat, setAlamat] = useState('');
  const [keperluanSurat, setKeperluanSurat] = useState('Pembuatan KTP');
  const [fileKTP, setFileKTP] = useState(null);
  const [fileKK, setFileKK] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Uploading...',
      text: 'Mohon tunggu, data sedang di-upload.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Menampilkan indikator loading
      }
    });
    try {
      // Upload file KTP dan KK ke Firebase Storage
      const uploadFile = async (file, folder) => {
        const storageRef = ref(storage, `${folder}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef); // Mendapatkan URL download dari file
      };

      const ktpUrl = fileKTP ? await uploadFile(fileKTP, `KTP`) : null;
      const kkUrl = fileKK ? await uploadFile(fileKK, `KK`) : null;

      // Tambahkan data ke Firestore
      const tanggalPengajuan = new Date().toISOString().split('T')[0];
      console.log(`ini keperluan surat ${keperluanSurat}`)
      const docRef = await addDoc(collection(db, COLLECTION_BERKAS), {
        nama,
        nik,
        ttl,
        agama,
        status,
        alamat,
        keperluanSurat,
        ktpUrl,
        kkUrl,
        tanggalPengajuan, // Menambahkan tanggal pengajuan
        statusSurat: 'Terkirim'
      });

      Swal.fire({
        title: 'Sukses!',
        text: 'Berkas Terkirim',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menambahkan data.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className='container mx-auto pt-1' style={{marginTop: '70px'}}>
      <h1 className='text-3xl font-semibold mt-3'>Layanan Surat Pengantar RT</h1>

      <div className='flex justify-center mt-5'>
        <form onSubmit={handleUpload} className='mb-10 border border-primary rounded px-6 py-4 form-w' >
          <h1 className='text-2xl font-bold mb-2 text-center'>Masukkan Berkas</h1>

          <label htmlFor="nama" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Nama Lengkap
            </span>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="nama"
            type="text"
            name="nama"
            placeholder="Masukkan Nama Lengkap"
            value={nama}
            onChange={e => setNama(e.target.value)} />
          </label>

          <label htmlFor="nik" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Nomor NIK
            </span>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="nik"
            type="text"
            name="nik"
            placeholder="Masukkan Nomor NIK"
            value={nik}
            onChange={e => setNik(e.target.value)} />
          </label>

          <label htmlFor="ttl" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Tempat, Tanggal Lahir
            </span>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="ttl"
            type="text"
            name="ttl"
            placeholder="Masukkan Tempat Tanggal Lahir"
            value={ttl}
            onChange={e => setTtl(e.target.value)} />
          </label>

          <label htmlFor="agama" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Agama
            </span>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="agama"
            type="text"
            name="agama"
            placeholder="Masukkan Agama"
            value={agama}
            onChange={e => setAgama(e.target.value)} />
          </label>

          <label htmlFor="status" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Status
            </span>
            <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="status"
            type="text"
            name="status"
            placeholder="Sudah Kawin / Belum Kawin"
            value={status}
            onChange={e => setStatus(e.target.value)} />
          </label>

          <label htmlFor="alamat" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Alamat Lengkap
            </span>
            <textarea rows={4} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
            id="alamat"
            type="alamat"
            name="alamat"
            placeholder="Masukkan Alamat Lengkap"
            value={alamat}
            onChange={e => setAlamat(e.target.value)} />
          </label>

          <label htmlFor="alamat" className="block mb-3">
          
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Jenis Keperluan Surat
          </span>
          <select
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            id="keperluanSurat"
            name="keperluanSurat"
            value={keperluanSurat}
            onChange={e => setKeperluanSurat(e.target.value)}
          >
            <option value="Pembuatan KTP">Pembuatan KTP</option>
            <option value="Pembuatan Akta Kelahiran Anak">Pembuatan Akta Kelahiran Anak</option>
            <option value="Pengurusan SKTM">Pengurusan SKTM</option>
            <option value="Pengurusan Kartu Keluarga">Pengurusan Kartu Keluarga</option>
            <option value="Pengurusan Surat Pindah Penduduk">Pengurusan Surat Pindah Penduduk</option>
            <option value="Pengurusan Surat Domisili">Pengurusan Surat Domisili</option>
            <option value="Pengurusan Surat Ahli Waris">Pengurusan Surat Ahli Waris</option>
            <option value="Pengurusan Surat Dispensasi Nikah">Pengurusan Surat Dispensasi Nikah</option>
            <option value="Pengurusan Surat Rekomendasi Sekolah">Pengurusan Surat Rekomendasi Sekolah</option>
            <option value="Pengurusan Surat Keterangan Kematian">Pengurusan Surat Keterangan Kematian</option>
            <option value="Pengurusan Surat Keterangan Usaha">Pengurusan Surat Keterangan Usaha</option>
          </select>
          </label>

          <label htmlFor="fileKTP" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Upload KTP
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              id="fileKTP"
              type="file"
              name="fileKTP"
              onChange={(e) => setFileKTP(e.target.files[0])} // Mengambil file yang dipilih
            />
          </label>

          <label htmlFor="fileKK" className="block mb-3">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Upload KK
            </span>
            <input
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              id="fileKK"
              type="file"
              name="fileKK"
              onChange={(e) => setFileKK(e.target.files[0])} // Mengambil file yang dipilih
            />
          </label>

          <button type="submit" className="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
            Kirim Berkas
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default SuratPengantar