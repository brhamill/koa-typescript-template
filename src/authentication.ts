const HEADER_REGEX = /bearer token-(.*)$/

module.exports.authenticate = async ({header: {authorization}}: any, Users: any) => {
  const email = authorization && HEADER_REGEX.exec(authorization)[1]
  return email && await Users.findOne({email})
}