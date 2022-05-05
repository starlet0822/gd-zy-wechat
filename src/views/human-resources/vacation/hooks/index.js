/*
 * @Description:
 * @Author: wuxxing
 * @LastEditTime: 2022-05-05 10:54:52
 */
export function findCodeName(target) {
  for (const item of target) {
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
