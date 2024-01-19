
export default function NativeIcons(props:{size:number, px:number, image:string}){
    return (
      <div className={`h-${props.size} px-${props.px}`}>
        <img className={`h-full text-red-500`} src={props.image} />
      </div>
    );
}