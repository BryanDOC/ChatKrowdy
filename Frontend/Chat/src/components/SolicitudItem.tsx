import React from 'react'
import { SolicitudItemProps } from '../types/index'


export default function SolicitudItem({
    imageUrl,
    sender_username,
    onConfirm,
    onReject} : SolicitudItemProps) {


     
      
  return (
    <div className="flex items-center p-4">
     
      <img
        src={imageUrl}
      
        className="object-cover w-12 h-12 mr-4 rounded-full"
      />

      <div className="">
        <h3 className="font-bold ">{sender_username}<span className="text-xs text-gray-100"> te envio una solicitud de amistad</span></h3>
        <div className="flex gap-2 mt-2">
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-[#fe7541] hover:bg-[#e86436] text-white rounded text-sm font-bold"
          >
            Confirmar
          </button>
          <button
            onClick={onReject}
            className="px-3 py-1 bg-[#262626] rounded text-gray-500 text-sm"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  )
}
