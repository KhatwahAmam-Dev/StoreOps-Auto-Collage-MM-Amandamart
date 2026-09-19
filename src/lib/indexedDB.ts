export const savePhotoToDB = async (photoData: { id: string; blob: Blob; timestamp: string }) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("StoreOpsDB", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("photos")) {
        db.createObjectStore("photos", { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("photos", "readwrite");
      const store = tx.objectStore("photos");
      store.put(photoData);
      tx.oncomplete = () => resolve(true);
    };
    request.onerror = () => reject(request.error);
  });
};

export const clearPhotoCache = async () => {
  return new Promise((resolve) => {
    const request = indexedDB.open("StoreOpsDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("photos", "readwrite");
      tx.objectStore("photos").clear();
      tx.oncomplete = () => resolve(true);
    };
  });
};
