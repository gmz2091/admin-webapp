import {
  getFirestore, deleteDoc, doc, collection, query, getDocs,
} from 'firebase/firestore';
import FirebaseApp from '../config/configFirebase';

const firestore = getFirestore(FirebaseApp());

export const deletdProduct = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'inventario', id));
  } catch (error) {
    console.log('error', error.message);
  }
};

// eslint-disable-next-line consistent-return
export const getInventarioData = async () => {
  try {
    const result = await getDocs(query(collection(firestore, 'inventario')));
    // setInventario(querySnapshot.docs);
    // console.log(result.docs);
    return result;
  } catch (error) {
    console.log('error', error.message);
  }
};
