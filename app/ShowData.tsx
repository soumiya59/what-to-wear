import Link from "next/link"
import Image from "next/image"
interface props{
  id:number
}
export default function ShowData({ id }:props) {
  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}