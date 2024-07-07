import { GithubIssuePayload, GithubStarPayload } from '../../interfaces';

export class GithubService {
  constructor() {}

  onStar(payload: GithubStarPayload): string {
    let message: string = '';
    const { starred_at, action, sender, repository } = payload;
    return (message = `User ${sender.login} ${action} star on ${repository.full_name}`);
  }

  onIssue(payload: GithubIssuePayload): string {
    let message: string = '';
    const { action, sender, repository, issue } = payload;
    return (message = `User ${sender.login} ${action} issue on ${repository.full_name}`);
  }
}
