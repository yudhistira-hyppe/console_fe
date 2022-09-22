export default function GetChipColor(data) {
  switch (data.toLowerCase()) {
    case 'tidak ditangguhkan':
      return { backgroundColor: 'rgba(113, 165, 0, 0.1)', color: 'rgba(113, 165, 0, 0.85)', fontWeight: 'bold' };
    case 'ditangguhkan':
      return { backgroundColor: 'rgba(255, 140, 0, 0.15)', color: 'rgba(255, 140, 0, 0.85)', fontWeight: 'bold' };
    case 'baru':
      return { color: '#E6094BD9', backgroundColor: '#E6094B1A', fontWeight: 'bold' };
    case 'dalam proses':
      return { color: '#FF8C00D9', backgroundColor: '#FF8C0026', fontWeight: 'bold' };
    case 'success':
      return { color: '#71A500D9', backgroundColor: '#71A5001A', fontWeight: 'bold' };
    case 'failure':
      return { color: '#676767D9', backgroundColor: '#6767671A', fontWeight: 'bold' };
    default:
      break;
  }
}
