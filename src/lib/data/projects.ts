/**
 * Project data for the projects page
 */

export type ProjectType = 'github' | 'website' | 'other';

export interface Project {
  name: string;
  description: string;
  url: string;
  type: ProjectType;
  /** For GitHub projects, the org/repo path (e.g., "martinemde/tinybucket") */
  githubPath?: string;
}

export const projects: Project[] = [
  {
    name: 'tinybucket',
    description: 'A Ruby client library for the Bitbucket Cloud REST API',
    url: 'https://github.com/martinemde/tinybucket',
    type: 'github',
    githubPath: 'martinemde/tinybucket'
  },
  {
    name: 'dm-constraints',
    description: 'Database constraint support for DataMapper',
    url: 'https://github.com/datamapper/dm-constraints',
    type: 'github',
    githubPath: 'datamapper/dm-constraints'
  },
  {
    name: 'bundler',
    description: 'Contributor to the Ruby dependency manager',
    url: 'https://github.com/rubygems/bundler',
    type: 'github',
    githubPath: 'rubygems/bundler'
  },
  {
    name: 'gem.coop',
    description: 'Ruby community cooperative',
    url: 'https://gem.coop',
    type: 'website'
  }
];
