import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { COLLECTION_BERKAS, db } from '../../config/firestore';

const DetailSurat = () => {
  const { id } = useParams();
  const docRef = doc(db, COLLECTION_BERKAS, id);
  const [surat, setSurat] = useState({});

  const fetchSurat = async () => {
    try {
      const suratSnapshot = await getDoc(docRef);

      if (suratSnapshot.exists()) {
        console.log("Document data:", suratSnapshot.data());
        setSurat(suratSnapshot.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  // Panggil fetchSurat saat komponen di-mount atau saat ID berubah
  useEffect(() => {
    fetchSurat();
  }, [id]);

  return (
    <div className='flex justify-center'>
      <form className='mb-10 border border-primary rounded px-6 py-2 form-w' >
        <h1 className='text-2xl font-bold mb-2 text-center'>Masukkan Berkas</h1>
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
      </form>
    </div>
  )
}

export default DetailSurat