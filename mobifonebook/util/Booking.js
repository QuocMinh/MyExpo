// Template
// { "id": 1, "stt": 2, "trangthai": 3, "soquay": 4, "sdt": "sample string 5", "macv": "sample string 6", "ngaybd": "sample string 7", "ngaykt": "sample string 8" }

let Booking = {
  "id": 1,
  "stt": 2,
  "trangthai": 3,
  "soquay": 4,
  "sdt": "sample string 5",
  "macv": "sample string 6",
  "ngaybd": "sample string 7",
  "ngaykt": "sample string 8"
}

export function NewBooking(pSdt, pMacv) {
  // Copy and assign value from Booking to NewBooking
  let Booking1 = { ...Booking, sdt: pSdt, macv: pMacv };

  return JSON.stringify(Booking1);
}


export function UpdateHelpdeskStatus(pId, pSoquay, pTrangthai) {
  let Booking2 = { ...Booking, id: pId, soquay: pSoquay, trangthai: pTrangthai };

  return JSON.stringify(Booking2);
}
