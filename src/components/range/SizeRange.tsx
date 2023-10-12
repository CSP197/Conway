export default function SizeRange() {
    function handleSubmit(e: any){
        e.preventDefault();
        const size = e.target;
        console.log(size);
    }
    return (
    <input type="range" min={0} max="100" value="50" className="range range-success" onSubmit={handleSubmit}/>
    );
}
