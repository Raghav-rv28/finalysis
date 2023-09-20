export default function Page({ params }: { params: { symbol: string } }) {
  return <div> {params.symbol}</div>;
}
