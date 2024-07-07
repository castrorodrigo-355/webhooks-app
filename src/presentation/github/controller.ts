import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { DiscordService } from '../services/Discord.service';

export class GithubController {
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const payload = req.body;

    let message: string;

    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
        break;
      case 'issues':
        message = this.githubService.onIssue(payload);
        break;
      default:
        message = `Unknown event: ${githubEvent}`;
    }
    console.log({ message });
    this.discordService
      .notify(message)
      .then(() => res.status(200).send('Accepted'))
      .catch(() => res.status(500).send('Internal server error'));
  };
}
