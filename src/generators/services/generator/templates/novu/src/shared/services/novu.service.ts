import { Novu } from '@novu/node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ITriggerPayload,
  TriggerRecipientsPayload
} from '@novu/node/build/main/lib/events/events.interface';

@Injectable()
export class NovuService {
  private readonly novu: Novu;

  constructor(
    public configService: ConfigService,
  ) {
    const apiKey: string = configService.get<string>('NOVU_API_KEY') || '';
    const backendUrl: string|null = configService.get<string>('NOVU_API_URL') || null;

    this.novu = new Novu(apiKey, { backendUrl });
  }

  async triggerEvent(
    templateName: string,
    to: TriggerRecipientsPayload,
    payload: ITriggerPayload,
  ): Promise<void> {
    await this.novu.events.trigger(templateName, { to, payload })
  }

  async broadcastEventToAll(templateName: string, payload: ITriggerPayload): Promise<void> {
    await this.novu.events.broadcast(templateName, { payload });
  }
}
