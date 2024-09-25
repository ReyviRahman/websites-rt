import React, { useState } from 'react';
import imgBeritaSatu from '../../assets/images/berita-satu.png'
import imgBeritaTiga from '../../assets/images/berita-tiga.jpg'
import imgBeritaDua from '../../assets/images/berita-dua.jpg'
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'

const Dashboard = () => {

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border border-gray-200 rounded-md mb-2">
        <button
          className="rounded-md w-full text-left px-4 py-2 bg-primary text-white text-lg font-bold flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>
        {isOpen && (
          <div className="px-4 py-2 bg-white border-t border-gray-200">
            {content}
          </div>
        )}
      </div>
    );
  };


  return (
    <>
    <div
      style={{
        marginTop: 80
      }}
      className='min-h-screen px-5'
    >
      <div className="grid grid-cols-3 gap-4">
        <div className='mt-6 col-span-2'>
          <h1 className='text-4xl font-bold'>Berita Terkini</h1>
          <hr className="mt-1 border-t-4 border-orange mb-5" />
          <div className='grid grid-cols-3 gap-y-3 gap-x-3'>
            <img className='object-cover rounded-lg' src={imgBeritaSatu} alt='' style={{height: '180px', width:'300px'}}/>
            <div className='col-span-2 flex flex-col justify-center'>
              <h1 className='text-3xl font-bold text-primary line-clamp-2'>Tingkatkan Literasi Statistik Melalui RT Cantik BPS</h1>
              <p className='line-clamp-4'>Valencia - Rabu 28 Agustus 2024 Badan Pusat Statistik (BPS) memberikan pembinaan tentang RT Cinta Statistik (RT Cantik) kepada RT Valencia, yang bertempat di Gedung Serba Guna RT Valencia, sekitar pukul jam 08.30 sampai denag jam 10.30 W…</p>
            </div>

            <img className='object-cover rounded-lg' src={imgBeritaDua} alt='' style={{height: '180px', width:'300px'}}/>
            <div className='col-span-2 flex flex-col justify-center'>
              <h1 className='text-3xl font-bold text-primary line-clamp-2'>Persiapan dan Perkenalan Program RT Cantik (RT Cinta Statistik)</h1>
              <p className='line-clamp-4'>Hari ini Selasa 14 Mei 2024 RT Valencia kedatangan tamu dari Kepala BPS (Badan Pusat Statistik) beserta tim RT Cantik (6 orang), yaitu bertujuan untuk menindak lanjuti program dari BPS yang bernama Program RT Cantik. Ikut hadir pula pada kesempatan kali ini bapak Camat, bapak Kepala RT Valencia dan sebagian Perangkat RT. Sebelum acara tersebut dimulai bapak Kepala RT Valencia (Darsono) menyampaikan terima kasih kepada tim dari BPS yang telah mempercayai RT Valencia untuk menjalankan prgram tersebut. Dan juga menyampaikan terima kasihnya kepada bapak Camat Tambakromo yang telah menyempatkan waktu untuk mendampingi tim dari BPS.</p>
            </div>
            <img className='object-cover rounded-lg' src={imgBeritaTiga} alt='' style={{height: '180px', width:'300px'}}/>
            <div className='col-span-2 flex flex-col justify-center'>
              <h1 className='text-3xl font-bold text-primary line-clamp-2'>Monitoring dan Pendampingan Pemutaakhiran Data IDM 2024</h1>
              <p className='line-clamp-4'>Demi percepatan Pemutaakhiran data IDM (Indek RT Membangun) Tahun 2024, hari ini Kamis tanggal 13 Juni 2024, RT Valencia Kecamatan Tambakromo di datangi tim dari Dinas Pemberdayaan Masyarakat dan RT </p>
            </div>

          </div>
        </div>
        <div className='mt-6'>
          <h1 className='text-4xl font-bold'>Pengumuman</h1>
          <hr className="mt-1 border-t-4 border-orange mb-5" />
          <Accordion
            title="Pembentukan KPPS Pilkada 2024"
            content="Dalam rangka pembentukan KPPS untuk Pemilihan Gubernur dan Wakil Gubernur, Bupati dan Wakil Bupati, dan Wali Kota dan Wakil Wali Kota Tahun 2024, Komisi Pemilihan Umum Kabupaten Pati mengundang Warga Negara Indonesia yang memenuhi persyaratan "
          />
          <Accordion
            title="Pembentukan PPDP"
            content="SESUAI KPKPU Nomor 475 Tahun 2024 Pengumuman pendaftaran Pantarlih/PPDP 13 - 17 Juni 2024 Penerimaan Pendaftaran Calon Pantarlih 13 - 19 Juni 2024 Penelitian Administrasi Calon Pantarlihan"
          />
          <Accordion
            title="Pengumuman Hasil Calon Anggota KPPS"
            content="PENGUMUMAN HASIL SELEKSI CALON ANGGOTA KELOMPOK PENYELENGGARA PEMUNGUTAN SUARA PADA PEMILIHAN UMUM TAHUN 2024 RT Valencia Berdasarkan Berita Acara Rapat Pleno PPS Rt Valencia"
          />
        </div>
      </div>
    </div>
    

    <div className=" bg-primary mt-8">
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
        <div className="flex items-center space-x-4 ">
          <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
          <div>
            <p className='text-white'>RT 11 Perumahan Valencia, RT Mendalo Indah, Kecamatan Jambi Luar Kota, Kabupaten Muaro Jambi</p>
          </div>
        </div>
        <div className='ms-20 text-white flex flex-col items-center justify-center'>
          <div>
            <h1 className='text-center font-semibold text-xl'>Kontak Kami</h1>
            <h1 className='text-center text-lg'>+62 8000-0000-0000</h1>
          </div>
          <div className='flex gap-4 mt-1'>
            <img className=" object-cover" src={iconFb} alt="" />
            <img className=" object-cover" src={iconIg} alt="" />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard