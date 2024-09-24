import React from 'react'

const Add = () => {
  return (
    <div className='flex justify-center'>
      <form onSubmit={handleUpload} className='mb-10 border border-primary rounded px-6 py-2 form-w' >
        <h1 className='text-2xl font-semibold mb-2 text-center'>{`Berkas ${surat.nama}`}</h1>
        <label htmlFor="nama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Nama Lengkap
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nama"
          type="text"
          name="nama"
          value={surat.nama}
          disabled={true} />
        </label>

        <label htmlFor="nik" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Nomor NIK
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="nik"
          type="text"
          name="nik"
          value={surat.nik}
          disabled={true} />
        </label>

        <label htmlFor="ttl" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Tempat, Tanggal Lahir
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="ttl"
          type="text"
          name="ttl"
          value={surat.ttl}
          disabled={true} />
        </label>

        <label htmlFor="agama" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Agama
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="agama"
          type="text"
          name="agama"
          value={surat.agama}
          disabled={true} />
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Status
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="status"
          type="text"
          name="status"
          value={surat.status}
          disabled={true} />
        </label>

        <label htmlFor="alamat" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Alamat Lengkap
          </span>
          <textarea rows={4} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="alamat"
          type="alamat"
          name="alamat"
          disabled={true}
          value={surat.alamat}/>
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Jenis Keperluan Surat
          </span>
          <input className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="status"
          type="text"
          name="status"
          value={surat.keperluanSurat}
          disabled={true} />
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            KTP
          </span>
          <a target="_blank" href={`${surat.ktpUrl}`} className="text-blue-500 underline hover:text-blue-700">Lihat KTP</a>
        </label>

        <label htmlFor="status" className="block mb-3">
          <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            KK
          </span>
          <a target="_blank" href={`${surat.kkUrl}`} className="text-blue-500 underline hover:text-blue-700">Lihat KK</a>
        </label>

        <h1 className='text-xl font-semibold mb-2 text-center'>Terima Permohonan Surat?</h1>
        <div className='flex gap-3 mb-3'>
          <button type='button' className="w-full bg-green-500 text-white font-bold p-1 rounded-md hover:bg-green-600 text-sm"
          onClick={clickYaButton}>
              Ya
          </button>
          <button type='button' className="w-full bg-red-500 text-white font-bold p-1 rounded-md hover:bg-red-600 text-sm"
          onClick={clickTidakButton}>
              Tidak
            </button>
        </div>
        { showYa && (
          <>
            <label htmlFor="fileBalasan" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Upload Surat Balasan
              </span>
              <input
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                id="fileBalasan"
                type="file"
                name="fileBalasan"
                onChange={(e) => setfileBalasan(e.target.files[0])} // Mengambil file yang dipilih
              />
            </label>
            <button type="submit" className="mt-2 mb-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
            Kirim
          </button>
          </>
          
        )}
        { showTidak && (
          <>
            <label htmlFor="alasanPenolakan" className="block mb-3">
              <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Alasan Penolakan
              </span>
              <textarea rows={4} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
              id="alasanPenolakan"
              type="text"
              name="alasanPenolakan"
              placeholder="Berikan Alasan Penolakan"
              value={alasanPenolakan}
              onChange={e => setAlasanPenolakan(e.target.value)} />
            </label>
            <button type="submit" className="mt-2 mb-2 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
              Kirim
            </button>
          </>
          
        )}
      </form>
    </div>
  )
}

export default Add