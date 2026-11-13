// Supabase 무료 프로젝트가 7일 동안 조용해서 멈추지 않도록,
// Vercel이 하루 두 번 이 주소를 호출하면 Supabase에 가벼운 조회 요청을 몇 번 보냅니다.
module.exports = async (req, res) => {
  const base = 'https://arhljhcixqlohlatgniq.supabase.co/rest/v1/reservations?select=id&limit=1';
  const key = 'sb_publishable_-Wx2NvdmLvcSEw1XSxgFUg_yDnS40Nc';   // 사이트에도 공개된 키(읽기 권한 없음)
  const results = [];
  for (let i = 0; i < 5; i++) {
    try {
      const r = await fetch(base, { headers: { apikey: key } });
      results.push(r.status);
    } catch (e) {
      results.push('error');
    }
  }
  res.status(200).json({ ok: true, results: results, time: new Date().toISOString() });
};
