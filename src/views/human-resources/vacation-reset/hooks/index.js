/*
 * @Description:
 * @Author: wuxxing
 * @LastEditTime: 2022-04-11 13:56:53
 */
export function findCodeName(target) {
  for (const item of target) {
    // console.log(item)
    const user = { empCode: '', empName: '' }
    item.rowData.forEach((v) => {
      if (v.filedId === 'emp_code') {
        user.empCode = v.fieldValue
      }
      if (v.filedId === 'emp_name') {
        user.empName = v.fieldValue
      }
    })
    console.log(user)
    if (user.empCode && user.empName) {
      return user
    }
  }
}