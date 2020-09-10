exports.seed = async function(knex) {
  await knex("ponies").truncate()
  await knex("ponies").insert([
    { name: "Twilight Sparkle" },
    { name: "Pinkie Pie" },
    { name: "Rainbow Dash" },
    { name: "Fluttershy" },
  ])
}