type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page(props: PageProps) {
  const { params: _params } = props;
  const params = await _params;
  return (
    <div>
      <h1>{JSON.stringify(params)}</h1>
    </div>
  );
}
