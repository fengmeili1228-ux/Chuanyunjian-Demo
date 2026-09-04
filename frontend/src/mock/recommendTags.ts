export function recommendTagsByProfession(profession: string): string[] {
  const map: Record<string, string[]> = {
    汽车维修: ['汽车维修', '电瓶更换', '轮胎修补', '发动机维修', '汽车保养'],
    汽车保养: ['汽车保养', '汽车维修', '发动机维修'],
    家政: ['家政服务', '保洁', '搬家'],
    保洁: ['保洁', '家政服务'],
    搬家: ['搬家', '家政服务'],
    java: ['Java开发', '后端开发'],
    react: ['React开发', '后端开发'],
    后端: ['后端开发', 'Java开发'],
  };

  const key = Object.keys(map).find((k) => profession.toLowerCase().includes(k.toLowerCase()));
  return key ? map[key] : ['汽车维修', '电瓶更换', '轮胎修补', '发动机维修', '汽车保养'];
}
