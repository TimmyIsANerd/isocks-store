/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if ((await Admin.count()) > 0) {
    return;
  }
  try {
    const newAdmin = await Admin.create({
      fullName: "Adefeyitimi Adeyeloja",
      emailAddress: "adefeyitimi@gmail.com",
      password: "11235813",
    }).fetch();

    const newGallery = await Gallery.create({ owner: newAdmin.id }).fetch();
    sails.log.info(newGallery);
  } catch (error) {
    sails.log.error(error);
  }
};
