import fs from 'fs-extra-promise'; // eslint-disable-line import/no-extraneous-dependencies

const copySchemaToProject = async (schemaFolder, project) => {
  try {
    await fs.copy(schemaFolder, `${project}/data`);

    // eslint-disable-next-line
    console.info(`Schema successfully copied to: ${project}`);
  } catch (error) {
    // eslint-disable-next-line
    console.error(`Error while trying to copy schema to: ${project}`, error);
  }
};

copySchemaToProject('./data', '../checkin-app');
